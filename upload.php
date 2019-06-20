<?php
$target_dir = "uploads/";
$randName = str_replace('.', '-', uniqid('button', true)). '.json';
$target_file = $target_dir . $randName;
$uploadOk = 1;
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
<script>
  var name = "<?php echo $randName?>";
  console.log(name);
  localStorage.setItem("StoryName", name);
  location.href = 'gameselector.html';
</script>
