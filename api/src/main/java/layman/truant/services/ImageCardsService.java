package layman.truant.services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import layman.truant.controllers.models.Image;
import layman.truant.controllers.models.ImageCard;
import layman.truant.controllers.models.ImageCardUpdate;
import layman.truant.database.entities.ImageCardDao;
import layman.truant.database.entities.ImageDao;
import layman.truant.database.repositories.ImageCardsRepository;
import layman.truant.database.repositories.ImagesRepository;
import layman.truant.utils.StorageBackend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ImageCardsService {

  @Autowired
  private ImageCardsRepository imageCardsRepository;

  @Autowired
  private ImagesRepository imagesRepository;

  @Autowired
  private StorageBackend storageBackend;

  // TODO
  private static final String DEFAULT_ACCOUNT = "default-account";

  public ImageCard getImageCard(String id) {
    ImageCardDao dao = getImageCardById(id);
    return convert(dao);
  }

  public List<ImageCard> getImageCards() {
    List<ImageCardDao> imageCardDaos = imageCardsRepository.findAll();
    return imageCardDaos.stream().map(i -> convert(i)).collect(Collectors.toList());
  }

  public ImageCard createImageCard(ImageCard imageCard) {
    ImageDao imageDao = getImageById(imageCard.getImage().getId());
    imageCard.setId(UUID.randomUUID().toString());
    imageCard.setCreatedBy(DEFAULT_ACCOUNT);
    imageCard.setCreatedAt(Instant.now());

    ImageCardDao dao = convert(imageCard);
    dao.setImage(imageDao);
    return convert(imageCardsRepository.save(dao));
  }

  @Transactional
  public ImageCard updateImageCard(String id, ImageCardUpdate imageCardUpdate) {
    ImageCardDao dao = getImageCardById(id);
    ImageDao imageDao = dao.getImage();

    if (imageCardUpdate.getImage() != null) {
      ImageDao newImage = getImageById(imageCardUpdate.getImage().getId());
      imagesRepository.delete(imageDao);
      dao.setImage(newImage);
    }

    dao.setName(imageCardUpdate.getName());
    dao.setContent(imageCardUpdate.getContent());
    dao.setFirstDayOfWork(imageCardUpdate.getFirstDayOfWork());
    dao.setLastDayOfWork(imageCardUpdate.getLastDayOfWork());
    dao.setCreatedBy(DEFAULT_ACCOUNT);
    dao.setUpdatedAt(Instant.now());

    return convert(imageCardsRepository.save(dao));
  }

  @Transactional
  public void deleteImageCard(String id) {
    ImageCard imageCard = getImageCard(id);
    String imageId = imageCard.getImage().getId();
    storageBackend.deleteImageFile(DEFAULT_ACCOUNT, imageId);
    imageCardsRepository.deleteById(UUID.fromString(id));
    imagesRepository.deleteById(UUID.fromString(imageId));
  }

  // TODO
  private ImageCardDao getImageCardById(String id) {
    return imageCardsRepository.findById(UUID.fromString(id))
        .orElseThrow(() -> new RuntimeException());
  }

  private ImageDao getImageById(String id) {
    return imagesRepository.findById(UUID.fromString(id)).orElseThrow(() -> new RuntimeException());
  }

  private ImageCard convert(ImageCardDao dao) {
    if (dao == null) {
      return null;
    }
    ImageCard image = new ImageCard();
    image.setId(dao.getId().toString());
    image.setName(dao.getName());
    image.setContent(dao.getContent());
    image.setFirstDayOfWork(dao.getFirstDayOfWork());
    image.setLastDayOfWork(dao.getLastDayOfWork());
    image.setImage(convert(dao.getImage()));
    image.setCreatedBy(dao.getCreatedBy());
    image.setCreatedAt(dao.getCreatedAt());
    image.setUpdatedAt(dao.getUpdatedAt());
    return image;
  }

  private ImageCardDao convert(ImageCard imageCard) {
    if (imageCard == null) {
      return null;
    }
    ImageCardDao dao = new ImageCardDao();
    dao.setId(UUID.fromString(imageCard.getId()));
    dao.setName(imageCard.getName());
    dao.setContent(imageCard.getContent());
    dao.setFirstDayOfWork(imageCard.getFirstDayOfWork());
    dao.setLastDayOfWork(imageCard.getLastDayOfWork());
    dao.setCreatedBy(imageCard.getCreatedBy());
    dao.setCreatedAt(imageCard.getCreatedAt());
    dao.setUpdatedAt(imageCard.getUpdatedAt());
    dao.setImage(convert(imageCard.getImage()));
    return dao;
  }

  private Image convert(ImageDao dao) {
    Image image = new Image();
    image.setId(dao.getId().toString());
    image.setUrl(dao.getUrl());
    return image;
  }

  private ImageDao convert(Image image) {
    ImageDao dao = new ImageDao();
    dao.setId(UUID.fromString(image.getId()));
    dao.setUrl(image.getUrl());
    return dao;
  }

}
