const storageRef = firebase.storage().ref();
//console.log(storageRef)
const avatar = document.querySelector('#avatar')
const formAvatar = document.querySelector('.form-avatar')
const avatarImage = document.querySelector('#imgAvatar')
//console.log(avatar.files[0])

const uploadImageToFb = () => {
    const file = avatar.files[0]
    const uploadTask = storageRef.child('imagesAvatar/' + file.name).put(file)

    uploadTask.on('state_changed', function (snapshot) {
    // mostrara el proceso de la subida de la imagen
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {
            // Handle unsuccessful uploads -> gestion de errores
            console.log(error)
        }, function() {
            // Handle successful uploads on complete -> subida satisfactoriamente
            uploadTask.snapshot.ref.getDownloadURL()
                .then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    saveImageOnBd(file.name, downloadURL)
                });
        });
}

const saveImageOnBd = ( file, url) => {
    db.collection('avatarImg').doc().set({
        file,
        url
    })
}

const showAvatar = () => {
    db.on('values', function(snapshot){
        let data = snapshot.val()
        console.log(data)
    })
} 

avatar.addEventListener('change', uploadImageToFb, false)