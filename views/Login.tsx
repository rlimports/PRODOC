
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { User, UserRole } from '../types';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: (user: User) => void;
  partners: User[];
}

export const Login: React.FC<LoginProps> = ({ onLogin, partners }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Bypass para Admin Master Hardcoded
    if (email === 'PRODOC@ADMIN314' && password === '!Rafa2002') {
      const user: User = { id: 'admin-master', name: 'Administrador Master', email, role: UserRole.ADMIN };
      onLogin(user);
      navigate('/admin');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          throw new Error('Não foi possível carregar seu perfil. Entre em contato com o suporte.');
        }

        const user: User = {
          id: profile.id,
          name: profile.name || '',
          email: profile.email || '',
          role: profile.role as UserRole,
          company: profile.company
        };

        onLogin(user);

        if (user.role === UserRole.ADMIN) {
          navigate('/admin');
        } else {
          navigate('/partner');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Credenciais inválidas. Verifique seu usuário e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">PRO<span className="text-blue-600">DOC</span></h1>
            <p className="text-slate-500 text-sm mt-1">Acesso exclusivo para parceiros e admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">E-mail / Usuário</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Seu e-mail cadastrado"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Entrar na Plataforma'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Área Segura PRODOC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
