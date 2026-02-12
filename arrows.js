<script>
    const container = document.querySelector(".cardContainer");

    function scrollRight() {
        container.scrollBy({ left: 300, behavior: "smooth" })
}

    function scrollLeft() {
        container.scrollBy({ left: -300, behavior: "smooth" })
}
</script>
