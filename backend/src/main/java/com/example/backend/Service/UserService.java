package com.example.backend.Service;

import com.example.backend.Config.JWTUtil;
import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Model.LoginInput;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    @PersistenceContext
    private EntityManager em;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderService orderService;

    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    JWTUtil jwtUtil;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) throw new UsernameNotFoundException("Пользователь не найден");
        return user;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public String saveUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Этот логин занят";
        }
        if(userRepository.findByEmail(user.getEmail())!=null){
            return "Этот email занят";
        }
        user.setRoles(List.of(new Role(1L,"ROLE_USER")));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "";
    }

    public void updateUser(User user){
        Optional<User> updatedUser = userRepository.findById(user.getId());
        if(updatedUser.isPresent()){
            updatedUser.get().setEmail(user.getEmail());
            userRepository.save(updatedUser.get());
        }
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<String> login (LoginInput loginInput){
        if(userRepository.findByEmail(loginInput.getEmail()) !=null){
            User user = userRepository.findByEmail(loginInput.getEmail());
            if (bCryptPasswordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user);
                return new ResponseEntity(token, HttpStatus.OK);
            }
            return new ResponseEntity("Wrong Data", HttpStatus.UNAUTHORIZED);
        }
        else{
            return new ResponseEntity("", HttpStatus.NOT_FOUND);
        }
    }

}