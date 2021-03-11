// 获取需要的渲染的父节点-景区酒店热度
var cent5 = document.getElementById("rendChart5");
var cent8 = document.getElementById("rendChart8");

// A级景区热度排行TOP10月度预测
var rendlist5 = [
  {
    name: "南宁沃顿国际大酒店",
    value: "16.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "26.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "19.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "92.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "12.5",
  },
];
// 星级酒店热度排行TOP10月度预测
var rendlist8 = [
  {
    name: "南宁沃顿国际大酒店",
    value: "26.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "36.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "49.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "12.5",
  },
  {
    name: "南宁沃顿国际大酒店",
    value: "19",
  },
];
// 模板渲染方法
let rendingStar = (id, list) => {
  list.forEach((item) => {
    id.innerHTML += `<div class="heat-item">
    <div class="hi-t">
        <p>${item.name}</p>
        <span>${item.value}%</span>
    </div>
    <div class="hi-b">
        <div class="hib-color" style="width:${item.value}%"></div>
    </div>
   </div>`;
  });
};
// A级景区热度渲染
rendingStar(cent5, rendlist5);
// 星级酒店热度渲染
rendingStar(cent8, rendlist8);
//------------------------------------------
//月度
var monthlyId = document.getElementById("monthlytxt");
let monthlyList = [
  {
    name: "00后",
    value: "80.1",
  },
  {
    name: "90后",
    value: "65.1",
  },
  {
    name: "80后",
    value: "62",
  },
  {
    name: "70后",
    value: "32.1",
  },
  {
    name: "60后",
    value: "19.1",
  },
];

let rendingMonthly = (id, list) => {
  list.forEach((item) => {
    id.innerHTML += `
    <div class="mlfc-item mopse">
      <span class="mlfc-name">${item.name}</span>
      <div class="mlfc-line-box mline-box">
        <i class="monthly-line" style="width:${item.value}%"></i>
      </div>
      <span>${item.value}%</span>
    </div>
    `;
  });
};
rendingMonthly(monthlyId, monthlyList);
//------------------------------------------
//跨省游客占比月度预测
var interprovincial = document.getElementById("interprovincial");
let interprovincialList = [
  {
    name: "黑龙江",
    value: "98.1",
    per: "+28.4",
  },
  {
    name: "广西",
    value: "88.5",
    per: "+22.5",
  },
  {
    name: "广东",
    value: "66.47",
    per: "+19.7",
  },
  {
    name: "海南",
    value: "60.6",
    per: "+16.9",
  },
  {
    name: "台湾",
    value: "31.5",
    per: "+11.8",
  },
];

let rendingInter = (id, list) => {
  list.forEach((item, index) => {
    id.innerHTML += `
    <div class="mlfc-item">
        <div class="mlfc-ind">${index + 1}</div>
        <span class="mlfc-name">${item.name}</span>
        <div class="mlfc-line-box">
        <i class="ml-line" style="width:${item.value}%"></i>
        </div>
        <div class="mlfc-bili">${item.value}</div>
        <span>同比${item.per}%</span>
    </div>
    `;
  });
};
rendingInter(interprovincial, interprovincialList);
