# AmigoSecreto

EVENTO
GRUPO
PESSOAS

events
-id int SERIAL PF AI
-status boolena default false
-title string
-description string
-grouped boolean default false 

eventGroups
-id int pk ai
-id_event int foreinkey(events.id)
-name string 

eventPeople
-id inst pk ai
-id_event int (relacionado a events.id)
-id_group inst (relacionado a eventGroups.id)
-name string
-cpf string
-matched string default 'vazio'

planejamento de rotas 

CRUD = create, read, update, delete 

soft delete = 



ROTAS 

-post /admin/login

-get /admin/event
-get /admin/event/:id
-post/ admin/event
-put /admin/event/:id
-delete /admin/event/:id 

-get /admin/events/:id_event/groups 
-get /admin/event/:id_event/groups/:id
-post /admin/events/:id_event/groups/
-put /admin/events/:id_event/groups/:id
-delete /admin/event/:id_event/groups/:id

-get /admin/events/:id_event/groups/:id_group/people
-get /admin/events/:id_event/groups/:id_group/people/:id
-post /admin/events/:id_event/groups/:id_group/people
-put /admin/events/:id_event/groups/:id_group/people/:id
-delete /admin/events/:id_event/groups/:id_group/people/:id

-get /events/:id
-get /events/:id_event/person/:cpf





