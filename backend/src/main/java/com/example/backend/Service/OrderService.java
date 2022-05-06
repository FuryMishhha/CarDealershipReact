package com.example.backend.Service;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    OrderService orderService;

    public void addOrder(Order order){
        orderRepository.save(order);
    }

    public List<Order> allOrders() {
        List <Order> order = orderRepository.findAll();
        order.sort(Comparator.comparingInt(Order::getId));
        return order;
    }

    public void updateOrder(Order order){
        Order updatedOrder = orderService.findOrder(order.getId());
        if (updatedOrder != null){
            if (!order.getStatus().equals("")) updatedOrder.setStatus(order.getStatus());
            orderRepository.save(updatedOrder);
        }
    }

    public Order findOrder(Integer id){
        return orderRepository.findById(id).orElse(null);
    }

    public void deleteOrder(Integer id){
        orderRepository.deleteById(id);
    }
}

