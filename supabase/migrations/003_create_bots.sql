-- Tabla de bots
create table public.bots (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  business_name   text not null,
  service_tier    text not null default 'basic'
                    check (service_tier in ('free', 'basic', 'premium')),
  status          text not null default 'active'
                    check (status in ('active', 'paused')),
  frequency_hours int not null default 24,
  location        text not null default 'Montevideo',
  publish_to      text not null default 'both'
                    check (publish_to in ('catalog', 'promotions', 'both')),
  product_template jsonb not null default '{}',
  runs_count      int not null default 0,
  last_run_at     timestamptz,
  next_run_at     timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

alter table public.bots enable row level security;
-- Solo accesible server-side via admin client (sin políticas públicas)

-- Tabla de promociones
create table public.promotions (
  id               uuid primary key default gen_random_uuid(),
  bot_id           uuid references public.bots(id) on delete set null,
  title            text not null,
  description      text,
  price            numeric(12,2),
  original_price   numeric(12,2),
  discount_percent int,
  currency         text not null default 'UYU',
  images           text[] not null default '{}',
  location         text not null,
  business_name    text not null,
  category         text not null default 'otros',
  valid_until      timestamptz,
  created_at       timestamptz not null default now()
);

alter table public.promotions enable row level security;

create policy "Promociones visibles públicamente"
  on public.promotions for select
  using (true);

-- Columna bot_id en productos (para rastrear publicaciones de bots)
alter table public.products add column bot_id uuid references public.bots(id) on delete set null;
