const routes = [
  {
    name: "오더 관리",
    routes: [
      {
        path: "/order/list",
        name: "오더 조회",
      },
      {
        path: "/order",
        name: "오더 등록",
      },
      {
        path: "/orderCheck",
        name: "요청 오더 조회",
      },
      {
        path: "/orderStatList",
        name: "오더 내역 조회",
      },
    ],
  },
  {
    name: "리포트",
    // routes: [
    //   {
    //     path: "/monthlyReport",
    //     name: "월별 리포트",
    //   },
    //   {
    //     path: "/sellerReport",
    //     name: "영업 리포트",
    //   },
    // ],
  },
  {
    name: "판매부번 관리",
    // routes: [
    //   {
    //     path: "/itemRegister",
    //     name: "판매부번 등록",
    //   },
    //   {
    //     path: "/itemManage",
    //     name: "판매부번 관리",
    //   },
    // ],
  },
  {
    name: "바이어 관리",
    // routes: [
    //   {
    //     path: "/buyerRegister",
    //     name: "바이어 등록",
    //   },
    //   {
    //     path: "/buyerManage",
    //     name: "바이어 조회",
    //   },
    // ],
  },
  {
    name: "직원 관리",
    // routes: [
    //   {
    //     path: "/userRegister",
    //     name: "직원 등록",
    //   },
    //   {
    //     path: "/userManage",
    //     name: "직원 조회",
    //   },
    // ],
  },
];

export default routes;
