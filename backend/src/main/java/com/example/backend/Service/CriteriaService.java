package com.example.backend.Service;

import com.example.backend.Entity.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.List;
@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CriteriaService {
    private final SessionFactory sessionFactory;
    private Session session;
    @Autowired
    private EntityManager entityManager;
    @PostConstruct
    void init() {
        session = sessionFactory.openSession();
    }
    @PreDestroy
    void closeSession() {
        session.close();
    }

    public List<Product> takeNew(String brand, String model, String body) {
        log.info("Find new cars");
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> criteriaQuery = criteriaBuilder.createQuery(Product.class);
        Root<Product> root = criteriaQuery.from(Product.class);

        Predicate predicateForBrand = criteriaBuilder.like(root.get("brand"), brand);
        Predicate predicateForModel = criteriaBuilder.like(root.get("model"), model);
        Predicate predicateForBody = criteriaBuilder.like(root.get("body"), body);

        Predicate finalePredicate = null;

        if(!brand.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForBrand);
            else finalePredicate = predicateForBrand;
        }
        if(!model.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForModel);
            else finalePredicate = predicateForModel;
        }

        if(!body.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForBody);
            else finalePredicate = predicateForBody;
        }

        criteriaQuery.where(finalePredicate);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    public List<Product> takeSup(String brand, String model, String body, String year) {
        log.info("Find supp cars");
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> criteriaQuery = criteriaBuilder.createQuery(Product.class);
        Root<Product> root = criteriaQuery.from(Product.class);

        Predicate predicateForBrand = criteriaBuilder.like(root.get("brand"), brand);
        Predicate predicateForModel = criteriaBuilder.like(root.get("model"), model);
        Predicate predicateForBody = criteriaBuilder.like(root.get("body"), body);
        Predicate predicateForYear = criteriaBuilder.like(root.get("release_year"), year);

        Predicate finalePredicate = null;

        if(!brand.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForBrand);
            else finalePredicate = predicateForBrand;
        }
        if(!model.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForModel);
            else finalePredicate = predicateForModel;
        }

        if(!body.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForBody);
            else finalePredicate = predicateForBody;
        }

        if(!year.equals("")){
            if (finalePredicate != null) finalePredicate = criteriaBuilder.and(finalePredicate,predicateForYear);
            else finalePredicate = predicateForYear;
        }

        criteriaQuery.where(finalePredicate);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
