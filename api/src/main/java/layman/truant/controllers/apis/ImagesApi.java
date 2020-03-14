package layman.truant.controllers.apis;

import java.util.List;
import layman.truant.controllers.models.Image;
import layman.truant.services.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImagesApi {

  @Autowired
  private ImagesService imagesService;

  @GetMapping
  public List<Image> getImages() {
    return imagesService.getImages();
  }

  @PostMapping
  public Image uploadImage(@RequestParam MultipartFile file) {
    return imagesService.uploadImage(file);
  }
}
