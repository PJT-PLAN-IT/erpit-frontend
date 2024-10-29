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
    routes: [
      {
        path: "/report",
        name: "월별 리포트",
      }
    ],
  },
  {
    name: "판매부번 관리",
    routes: [
      {
        path: "/item",
        name: "판매부번 조회",
      },
      {
        path: "/price",
        name: "바이어별 판매가 조회",
      },
    ],
  },
  {
    name: "바이어 관리",
    routes: [
      {
        path: "/buyer",
        name: "바이어 조회",
      }
    ],
  },
  {
    name: "직원 관리",
    routes: [
      {
        path: "/user",
        name: "직원 조회",
      },
    ],
  },
];

export default routes;