-- remove all old records
DELETE FROM users;
DELETE FROM tickets;
DELETE FROM comments;

-- reset all sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE tickets_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;

-- users
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('rob.stark@test.com', 'Rob Stark', 'fd13133ad331b6bd.413c3c5b78a4d27c398b92f0d24e9175045b959f748365d93b49333823fe599e', '2022-04-09 17:39:11.227870', '2022-04-09 17:39:11.227870', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('a.schmidt@test.com', 'Amelia Schmidt', 'eab295ab157dc887.45a9b6c50fc2b86f8abbbd506c8b1d80ba5c2ba92d95eddc752548ecee762ece', '2022-04-09 17:40:12.447131', '2022-04-09 17:40:12.447131', null, 'admin', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('noob.saibot@test.com', 'Noob Saibot', '2f0ca7bb62a78fd4.4c2976efc8369fcf566a09710a03351819d2af01df1285e019ced9c7270de070', '2022-04-09 17:41:30.377440', '2022-04-09 17:41:30.377440', null, 'moderator', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('sub.zero@test.com', 'Sub Zero', '9ac7aaf2d4f0ae94.57ef0d6cb7b8c57e7ba33f3e99c904fa7d16f8312e7125569f50a0e9e2d999d0', '2022-04-10 11:45:58.823059', '2022-04-10 11:45:58.823059', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('kung.lao@test.com', 'Kung Lao', '202c77a42b133ae0.17b410012619c128d16f1887e675bd1b8e4103934aa56de4e3a0e455ace3c19f', '2022-04-10 11:47:28.040228', '2022-04-10 11:47:28.040228', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('liu.kang@test.com', 'Liu Kang', '635336ee718748df.823b109e2c27fbaef99057584e8c14325a78a4d12c0e92e9b3205c596518c024', '2022-04-10 11:48:57.003574', '2022-04-10 11:48:57.003574', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('johny.cage@test.com', 'Johny Cage', '560120dd3f71c925.a612e9ab6246cd5dc3c4e2a2da59b5a4bc0e40a9b740968e40f5335a95f37e3d', '2022-04-10 11:49:35.398794', '2022-04-10 11:49:35.398794', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('sonya.blade@test.com', 'Sonya Blade', 'a5009582e7a3e65b.004407844f951f846836626c9f07c7a3a7bb82eaf40a3bd04bd4df9a259328da', '2022-04-10 11:51:25.838112', '2022-04-10 11:51:25.838112', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('pieter.hollenbeck@testing.com', 'Pieter Hollenbeck', '3a34ebe9037e9e47.98d5462c42ed89fcc2c739edb646f3ac0318f066dbf94fab20c6e061591d3f73', '2022-04-06 00:00:00.000000', '2022-04-06 00:00:00.000000', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('johndoe@foo.com', 'John', '1c151e7fcd6ce414.ebf16e44547e2dba31639f77b71c9805ab30fd8edc7392b4996c32e8a662bee3', '2022-04-09 16:25:34.842543', '2022-04-09 16:25:34.842543', null, 'user', false);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('romankowalski@testing.com', 'Roman Maria Kowalki', '3a34ebe9037e9e47.98d5462c42ed89fcc2c739edb646f3ac0318f066dbf94fab20c6e061591d3f73', '2022-04-06 00:00:00.000000', '2022-04-06 00:00:00.000000', null, 'admin', true);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('john_dafoe@foo.com', 'John Dafoe', '3a34ebe9037e9e47.98d5462c42ed89fcc2c739edb646f3ac0318f066dbf94fab20c6e061591d3f73', '2022-04-07 23:27:43.339595', '2022-04-07 23:27:43.339595', null, 'user', true);
INSERT INTO public.users (email, name, password, created_at, updated_at, deleted_at, role, "isActive") VALUES ('joostvanhoof@testing.com', 'Joost van Hoof', '3a34ebe9037e9e47.98d5462c42ed89fcc2c739edb646f3ac0318f066dbf94fab20c6e061591d3f73', '2022-04-06 00:00:00.000000', '2022-04-06 00:00:00.000000', null, 'admin', true);

-- tickets
INSERT INTO public.tickets (title, description, "assigneeId", "authorId", "relatedTicketId", created_at, updated_at, deleted_at, priority, status, position) VALUES ('A Bug', 'This is a bug report', null, 1, null, '2022-04-10 00:00:00.000000', '2022-04-10 00:00:00.000000', null, 'low', 'to_do', null);
INSERT INTO public.tickets (title, description, "assigneeId", "authorId", "relatedTicketId", created_at, updated_at, deleted_at, priority, status, position) VALUES ('Next bug', 'This is a new bug', 2, 2, null, '2022-04-10 00:00:00.000000', '2022-04-10 00:00:00.000000', null, 'normal', 'new', null);
INSERT INTO public.tickets (title, description, "assigneeId", "authorId", "relatedTicketId", created_at, updated_at, deleted_at, priority, status, position) VALUES ('Button is not working', 'When button is clicked, nothing happens.', 2, 3, null, '2022-04-10 00:00:00.000000', '2022-04-10 00:00:00.000000', null, 'normal', 'new', null);
INSERT INTO public.tickets (title, description, "assigneeId", "authorId", "relatedTicketId", created_at, updated_at, deleted_at, priority, status, position) VALUES ('The app is not working', 'URGENT! Nothing is working.', null, 5, null, '2022-04-10 00:00:00.000000', '2022-04-10 00:00:00.000000', null, 'normal', 'new', null);

-- comments
INSERT INTO comments ("ticketId", content, "authorId") VALUES (1, 'It''s a feature not a bug...', 1);
INSERT INTO comments ("ticketId", content, "authorId") VALUES (1, 'Then we have to change this "feature".', 3);
INSERT INTO comments ("ticketId", content, "authorId") VALUES (2, 'It''s working on my machine.', 2);

