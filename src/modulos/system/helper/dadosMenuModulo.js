export function getListMenus(){
  let menus = [];

  menus = [
    {
      rota: "system",
      menus:[
        {
          name:  "users",
          permission:[
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 6,
              name: "user-list",
              pivot: {role_id: 1, permission_id: 6},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 7,
              name: "user-create",
              pivot: {role_id: 1, permission_id: 7},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:13.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 8,
              name: "user-show",
              pivot: {role_id: 1, permission_id: 8},
              updated_at: "2021-01-31T18:51:13.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:13.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 9,
              name: "user-edit",
              pivot: {role_id: 1, permission_id: 9},
              updated_at: "2021-01-31T18:51:13.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:13.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 10,
              name: "user-delete",
              pivot: {role_id: 1, permission_id: 10},
              updated_at: "2021-01-31T18:51:13.000000Z",
            },
          ]
        },
        {
          name:  "permissions",
          permission:[
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 1,
              name: "role-list",
              pivot: {role_id: 1, permission_id: 1},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 2,
              name: "role-create",
              pivot: {role_id: 1, permission_id: 2},
              updated_at: "2021-01-31T18:51:12.000000Z"
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 3,
              name: "role-show",
              pivot: {role_id: 1, permission_id: 3},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 4,
              name: "role-edit",
              pivot: {role_id: 1, permission_id: 4},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 5,
              name: "role-delete",
              pivot: {role_id: 1, permission_id: 5},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
          ]
        }
      ]
    },
  ]

  return menus;
}