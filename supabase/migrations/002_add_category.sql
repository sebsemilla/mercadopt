alter table public.products add column category text not null default 'otros';

update public.products set category = 'electronica'
  where title ilike '%iphone%' or title ilike '%notebook%' or title ilike '%tv%' or title ilike '%airpods%';

update public.products set category = 'ropa'
  where title ilike '%zapatillas%' or title ilike '%nike%';

update public.products set category = 'deportes'
  where title ilike '%bicicleta%';

update public.products set category = 'juegos'
  where title ilike '%ps5%';

update public.products set category = 'hogar'
  where title ilike '%silla%';
