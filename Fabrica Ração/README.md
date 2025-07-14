# App Supabase + React - Fábrica de Ração

Este projeto é um painel de controle completo com autenticação, controle de usuários, produção, estoque e pedidos, usando Supabase no backend e React no frontend.

## Rodando localmente

1. Copie `.env.local.example` para `.env.local` e preencha com os dados do seu projeto Supabase.
2. Instale as dependências:
   ```
   npm install
   ```
3. Rode o projeto:
   ```
   npm run dev
   ```

## Deploy na Vercel

Configure as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas configurações do projeto na Vercel.

---
Scripts SQL e mais instruções estão na pasta `docs/sql`.