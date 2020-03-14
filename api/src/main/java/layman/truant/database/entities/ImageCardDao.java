package layman.truant.database.entities;

import java.time.Instant;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;
import lombok.Data;

@Entity
@Table(name = "image_cards")
@Data
public class ImageCardDao {

  @Id
  private UUID id;
  private String name;
  private String content;
  private Instant firstDayOfWork;
  private Instant lastDayOfWork;
  private String createdBy;
  private Instant createdAt;
  private Instant updatedAt;

  @OneToOne
  @JoinColumn(name = "image_id")
  private ImageDao image;

  @Version
  private Long version;

}
