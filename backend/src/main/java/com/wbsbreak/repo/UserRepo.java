import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface extends  JpaRepository<AppUser, Long>{
    
  @Query(value = "SELECT * FROM users WHERE usernae = :un", nativeQuery = true)
  Optional<User> findByUsername(@Param("un") String un);

}
