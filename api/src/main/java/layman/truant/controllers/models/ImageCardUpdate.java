package layman.truant.controllers.models;

import java.time.Instant;
import lombok.Data;

@Data
public class ImageCardUpdate {

  private String name;
  private String content;
  private Instant firstDayOfWork;
  private Instant lastDayOfWork;
  private String createdBy;
  private Image image;
}
