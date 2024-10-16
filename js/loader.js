const loadingspinner = (isLoading) => {
    const spinner = document.getElementById("loader");
    
    if (isLoading) {
        spinner.classList.remove('hidden');
        // document.getElementById('All_categories_pet').innerHTML="";
    }else{
        spinner.classList.add('hidden');
    }
}