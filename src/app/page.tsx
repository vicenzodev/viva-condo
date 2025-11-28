"use client";

import { useEffect, useState } from "react";
import { createClient } from "./utils/supabase/client";
import { useRouter } from "next/navigation";

// Radix Toast
import * as Toast from "@radix-ui/react-toast";

export default function Page() {

  const supabase = createClient();
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Estado do toast
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.replace("/inicio");
      } else {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const login = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data.user) {
        setErrorMsg("E-mail ou senha inválidos.");
        setLoading(false);
        return;
      }

      // 🔔 Dispara toast
      setToastOpen(true);

      // Redireciona
      setTimeout(() => {
        router.replace("/inicio");
      }, 900);

    } catch (err) {
      setErrorMsg("Erro inesperado. Tente novamente.");
      setLoading(false);
    }
  };

  async function signOut(){
    await supabase.auth.signOut();
  }

  if (checkingSession) {
    return null;
  }

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      
      {/* TOAST */}
      <Toast.Root
        open={toastOpen}
        onOpenChange={setToastOpen}
        className="bg-green-600/70 text-white px-4 py-3 rounded-md shadow-lg data-[state=open]:animate-slideIn data-[state=closed]:animate-fadeOut"
      >
        <Toast.Title className="font-semibold">Login realizado!</Toast.Title>
        <Toast.Description>Aguarde...</Toast.Description>
      </Toast.Root>

      <Toast.Viewport
        className="fixed top-4 right-4 z-50 w-96 max-w-full outline-none"
      />

      {/* CONTEÚDO */}
      <div className="flex h-screen flex-col md:flex-row">
        <div className="w-full flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl text-gray-500 font-bold mb-4">Olá 👋</h2>
            <p className="text-gray-500 mb-6">Insira as informações que você usou ao se registrar.</p>

            <form onSubmit={login}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />

              {errorMsg && (
                <div className="mb-4 text-red-600 text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <button type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

          </div>
        </div>
      </div>

    </Toast.Provider>
  );
}
