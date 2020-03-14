package layman.truant.utils;

import com.google.cloud.Identity;
import com.google.cloud.Policy;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.StorageRoles;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StorageBackend {

  @Value("${memory-tree.googleCloud.project}")
  private String projectId;

  @Value("${memory-tree.cloudStorage.imagesBucket}")
  private String imagesBucketName;

  private Storage storage;
  private Bucket imagesBucket;

  @PostConstruct
  public void setup() {
    storage = StorageOptions.newBuilder().setProjectId(projectId).build()
        .getService();
    imagesBucket = storage
        .get(imagesBucketName, Storage.BucketGetOption.fields());
    Policy originalPolicy = storage.getIamPolicy(imagesBucketName);
    storage.setIamPolicy(imagesBucket.getName(), originalPolicy
        .toBuilder()
        .addIdentity(StorageRoles.objectViewer(), Identity.allUsers()) // All users can view
        .build());
  }

  public String writeBinaryImageFile(String accountId, String fileName, byte[] content) {
    Blob blob = imagesBucket.create(fileNameFromAccountId(accountId, fileName), content);
    return blob.getMediaLink();

  }

  public byte[] readBinaryAccountFile(String accountId, String fileName) {
    return storage.readAllBytes(
        BlobId.of(imagesBucket.getName(), fileNameFromAccountId(accountId, fileName)));
  }

  public void deleteImageFile(String accountId, String fileName) {
    storage.delete(imagesBucket.getName(), fileNameFromAccountId(accountId, fileName));
  }

  private String fileNameFromAccountId(String accountId, String fileName) {
    return String.format("%s/%s", accountId, fileName);
  }
}
