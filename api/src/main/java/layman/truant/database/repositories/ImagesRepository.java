package layman.truant.database.repositories;

import java.util.List;
import java.util.UUID;
import layman.truant.database.entities.ImageDao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagesRepository extends CrudRepository<ImageDao, UUID> {

  List<ImageDao> findAll();

}
