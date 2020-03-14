//package layman.truant.configs;
//
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.stereotype.Component;
//import org.springframework.validation.annotation.Validated;
//
//@Component
//@ConfigurationProperties(prefix = "memory-tree", ignoreUnknownFields = false)
//@Validated
//public class MemoryTreeConfig {
//
////  private static final String ENV_VAR_SET = "^[^$].+";
//
//  private GoogleCloud googleCloud;
//  private CloudStorage cloudStorage;
//
//  public GoogleCloud getGoogleCloud() {
//    return googleCloud;
//  }
//
//  public void setGoogleCloud(GoogleCloud googleCloud) {
//    this.googleCloud = googleCloud;
//  }
//
//  public CloudStorage getCloudStorage() {
//    return cloudStorage;
//  }
//
//  public void setCloudStorage(CloudStorage cloudStorage) {
//    this.cloudStorage = cloudStorage;
//  }
//
//  public static class GoogleCloud {
//
//    private String project;
//
//    public String getProject() {
//      return project;
//    }
//
//    public void setProject(String project) {
//      this.project = project;
//    }
//  }
//
//  public static class CloudStorage {
//
//    private String imagesBucket;
//
//    public String getImagesBucket() {
//      return imagesBucket;
//    }
//
//    public void setImagesBucket(String imagesBucket) {
//      this.imagesBucket = imagesBucket;
//    }
//  }
//
//
//}
