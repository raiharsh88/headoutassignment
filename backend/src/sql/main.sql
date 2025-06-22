create table if not exists posts(
    id varchar(255),
    caption varchar(255),
    user_id varchar(255),
    file_path varchar(500),
    file_type varchar(255),
    metadata json,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    primary key(id)
);

create table if not exists users(
    id varchar(255),
    username varchar(255),
    email varchar(255),
    password varchar(255),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    primary key(id)
);

create table if not exists action_logs(
    id varchar(255),
    action varchar(20),
    user_id varchar(255),
    is_true boolean,
    creaed_at  timestamptz default now(),
    updated_at timestamptz default now(),
    post_id varchar(255),
    primary key(user_id , post_id , action)
);