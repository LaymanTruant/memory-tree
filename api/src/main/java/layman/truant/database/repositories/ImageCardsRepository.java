package layman.truant.database.repositories;

import java.util.List;
import java.util.UUID;
import layman.truant.database.entities.ImageCardDao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageCardsRepository extends CrudRepository<ImageCardDao, UUID> {

  List<ImageCardDao> findAll();

}
