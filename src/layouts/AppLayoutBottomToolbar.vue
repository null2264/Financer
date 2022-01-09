<template>
    <div class="bottom-toolbar">
        <div class="toolbar-inner">
            <a href="#"><vue-feather type="home" size="25px"/></a>
            <a href="#"><vue-feather type="trending-down" size="25px"/></a>
            <a href="#"><vue-feather type="plus-circle" size="29px"/></a>
            <a href="#"><vue-feather type="trending-up" size="25px"/></a>
            <a href="#"><vue-feather type="user" size="25px"/></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppLayoutBottomToolbar",
}
</script>

<style scoped>
.bottom-toolbar {
  background-color: #333;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.bottom-toolbar .toolbar-inner {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
}

/* Style the links inside the navigation bar */
.bottom-toolbar .toolbar-inner a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.bottom-toolbar .toolbar-inner a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.bottom-toolbar .toolbar-inner a.active {
  background-color: #04AA6D;
  color: white;
}
</style>
