package layman.truant.database.entities;

import java.time.Instant;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;
import lombok.Data;

@Entity
@Table(name = "images")
@Data
public class ImageDao {

  @Id
  private UUID id;
  private String url;
  private String createdBy;
  private Instant createdAt;

  @Version
  private Long version;

}
