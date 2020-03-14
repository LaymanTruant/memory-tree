package layman.truant.controllers.apis;

import java.util.List;
import layman.truant.controllers.models.ImageCard;
import layman.truant.controllers.models.ImageCardUpdate;
import layman.truant.services.ImageCardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/image-cards")
@CrossOrigin
public class ImageCardsApi {

  @Autowired
  private ImageCardsService imageCardsService;

  @GetMapping("/{id}")
  public ImageCard getImageCard(@PathVariable String id) {
    return imageCardsService.getImageCard(id);
  }

  @GetMapping
  public List<ImageCard> getImageCards() {
    return imageCardsService.getImageCards();
  }

  @PostMapping
  public ImageCard createImageCard(@RequestBody ImageCard imageCard) {
    return imageCardsService.createImageCard(imageCard);
  }

  @PutMapping("/{id}")
  public ImageCard updateImageCard(@PathVariable String id,
      @RequestBody ImageCardUpdate imageCardUpdate) {
    return imageCardsService.updateImageCard(id, imageCardUpdate);
  }

  @DeleteMapping("/{id}")
  public void deleteImageCard(@PathVariable String id) {
    imageCardsService.deleteImageCard(id);
  }

}
