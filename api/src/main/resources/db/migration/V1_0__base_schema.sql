--create table accounts(
--    id uuid not null primary key,
--    username varchar(255) unique not null,
--    full_name varchar(255) not null,
--    password varchar(255) not null,
--    created_at timestamp not null,
--    updated_at timestamp,
--    version bigint default 0 not null
--);

create table images(
  id uuid not null primary key,
  url varchar(255),
  created_by varchar(255) not null,
  created_at timestamp not null,
  version bigint default 0 not null
);

create table image_cards(
  id uuid not null primary key,
  name varchar(255) not null,
  content varchar(255),
  first_day_of_work timestamp not null,
  last_day_of_work timestamp not null,
  created_by varchar(255) not null,
  created_at timestamp not null,
  updated_at timestamp,
  image_id uuid not null,
  version bigint default 0 not null,
  constraint fk_image_cards_image_id foreign key(image_id) references images(id)
);
