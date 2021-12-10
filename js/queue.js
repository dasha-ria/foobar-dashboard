"use strict";

import { Order } from "./order.js";

export function displayQueue(queueData) {
  console.log("queue data");
  console.log(queueData);

  // sort orders from earliest to latest and clear container element
  const sorted = queueData.sort((a, b) => a.startTime - b.startTime);
  const ordersWrapper = document.querySelector("#queue .orders");
  ordersWrapper.innerHTML = "";

  if (sorted.length > 0) {
    // if there are orders in the queue
    let mql = window.matchMedia("(max-width: 768px)");
    if (mql.matches) {
      // if the viewport is 768 pixels wide or less, display all orders
      displayOrders(sorted, ordersWrapper, false);
    } else {
      // if the viewport is more than than 768 pixels wide, display only three earliest orders
      const queueToDisplay = sorted.slice(0, 3);
      displayOrders(queueToDisplay, ordersWrapper, true);
      // display  how many orders there are that are not shown
      const hiddenOrders = sorted.length - queueToDisplay.length;
      if (hiddenOrders > 0) {
        displayNumberOfHiddenOrders(hiddenOrders);
      } else {
        hideNumberOfHiddenOrders();
      }
    }
  } else {
    // if there are no orders in queue
    displayNoQueueMessage(ordersWrapper);
  }
}

function displayOrders(orders, container, flag) {
  orders.forEach((item, index) => {
    const order = new Order(item.id, item.order);
    order.createNode(container);
    if (flag) {
      // console.log(order.node.getBoundingClientRect());
      order.animateNodeIn(index);
      // setTimeout(order.animateNodeOut, 5000 - (500 + index * 200) * 2);
    }
  });
}

function displayNumberOfHiddenOrders(number) {
  document.querySelector("#queue .plus_num").style.display = "block";
  document.querySelector("#queue .plus_num").textContent = `+${number}`;
}

function hideNumberOfHiddenOrders() {
  document.querySelector("#queue .plus_num").style.display = "none";
}

function displayNoQueueMessage(container) {
  const noQueueElement = document.createElement("p");
  noQueueElement.textContent = "No orders in the queue";
  noQueueElement.className = "flex flex-col justify-center ";
  container.append(noQueueElement);
}
