/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import beans.Employe;
import java.util.List;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import util.HibernateUtil;

/**
 *
 * @author a
 */
public class EmployeService {

    public boolean create(List<Employe> e) {
        Transaction tx = null;
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            tx = session.beginTransaction();
            e.forEach((emp) -> {
                session.save(emp);
            });
            tx.commit();
            return true;
        } catch (HibernateException exp) {
            if (tx != null) {
                tx.rollback();
            }
            return false;
        }
    }
}
