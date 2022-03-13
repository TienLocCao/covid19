<template>
    <div>
        <div v-for="(item, index) in items" :key="index">
            <table class="dialog-products__table  mb-3">
                <tr>
                <td class="fs--font-basic">name common: </td>
                <td class="fs--font-basic">{{item.name.common}}</td>
                </tr>
                <tr>
                <td class="fs--font-basic">flags: </td>
                <td class="fs--font-basic flags"><img :src="item.flags.png" alt="" width="40px" height="auto"></td>
                </tr>
                <tr>
                <td class="fs--font-basic">population:</td>
                <td class="fs--font-basic">{{item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</td>
                </tr>
                <tr>
                <td class="fs--font-basic">capital:</td>
                <td class="fs--font-basic">{{item.capital && item.capital[0]}}</td>
                </tr>
                <tr>
                <td class="fs--font-basic">region:</td>
                <td class="fs--font-basic">{{item.region}}</td>
                </tr>
                <tr>
                <td class="fs--font-basic">subregion:</td>
                <td class="fs--font-basic">{{item.subregion}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        items: { type: Array }
    }
    
}
</script>