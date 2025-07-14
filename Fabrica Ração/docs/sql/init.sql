
-- Tabela de perfis de usuários
create table if not exists user_profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  role text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Trigger para inserir perfil automaticamente
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name', 'vendas');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Habilitar RLS
alter table public.user_profiles enable row level security;

-- Política: o usuário pode ver seu próprio perfil
create policy "Users can view their profile" on public.user_profiles
for select using (auth.uid() = id);
