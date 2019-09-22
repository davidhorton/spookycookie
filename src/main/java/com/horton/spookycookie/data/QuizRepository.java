package com.horton.spookycookie.data;

import com.horton.spookycookie.dto.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author David Horton
 * Date:   9/19/19
 */
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByCurrent(boolean current);
}
