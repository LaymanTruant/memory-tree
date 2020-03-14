package layman.truant.controllers.models;

import java.time.Instant;
import lombok.Data;

@Data
public class ImageCard {

  private String id;
  private String name;
  private String content;
  private Instant firstDayOfWork;
  private Instant lastDayOfWork;
  private String createdBy;
  private Instant createdAt;
  private Instant updatedAt;
  private Image image;

}
