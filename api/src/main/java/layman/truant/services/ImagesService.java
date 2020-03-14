package layman.truant.services;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import layman.truant.controllers.models.Image;
import layman.truant.database.entities.ImageDao;
import layman.truant.database.repositories.ImagesRepository;
import layman.truant.utils.StorageBackend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagesService {

  @Autowired
  private ImagesRepository imagesRepository;

  @Autowired
  private StorageBackend storageBackend;

  // TODO
  private static final String DEFAULT_ACCOUNT = "default-account";

  public List<Image> getImages() {
    List<ImageDao> imageDaos = imagesRepository.findAll();
    return imageDaos.stream().map(i -> convert(i)).collect(Collectors.toList());
  }

  @Transactional
  public Image uploadImage(MultipartFile file) {

    byte[] content = new byte[0];

    try {
      content = file.getBytes();
      // TODO
    } catch (IOException e) {
      e.printStackTrace();
    }

    UUID uuid = UUID.randomUUID();
    String id = uuid.toString();
    String mediaUrl = storageBackend.writeBinaryImageFile(DEFAULT_ACCOUNT, id, content);
    ImageDao dao = new ImageDao();
    dao.setId(uuid);
    dao.setUrl(mediaUrl);
    dao.setCreatedAt(Instant.now());
    dao.setCreatedBy(DEFAULT_ACCOUNT);
    return convert(imagesRepository.save(dao));
  }

  private Image convert(ImageDao dao) {
    Image image = new Image();
    image.setId(dao.getId().toString());
    image.setUrl(dao.getUrl());
    return image;
  }

}
