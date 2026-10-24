-- Tabla principal de productos
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  price       numeric(12, 2) not null,
  currency    text not null check (currency in ('UYU', 'ARS')),
  images      text[] not null default '{}',
  condition   text not null check (condition in ('Nuevo', 'Usado')),
  location    text not null,
  free_shipping boolean not null default false,
  sold        integer not null default 0,
  stock       integer not null default 0,
  description text,
  specs       jsonb,
  seller_name text,
  seller_sales integer,
  seller_rating numeric(3, 1),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Actualiza updated_at automáticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on public.products
  for each row execute function update_updated_at();

-- Row Level Security: lectura pública, escritura solo autenticados
alter table public.products enable row level security;

create policy "Productos visibles públicamente"
  on public.products for select
  using (true);

create policy "Solo usuarios autenticados pueden insertar"
  on public.products for insert
  with check (auth.role() = 'authenticated');

create policy "Solo usuarios autenticados pueden actualizar"
  on public.products for update
  using (auth.role() = 'authenticated');
