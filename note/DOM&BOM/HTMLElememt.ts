const div = document.createElement('div');
div.offsetWidth       //返回元素的宽度（包括元素宽度、内边距和边框，不包括外边距）
div.offsetHeight      //返回元素的高度（包括元素高度、内边距和边框，不包括外边距）
div.clientWidth        //返回元素的宽度（包括元素宽度、内边距，不包括边框和外边距）
div.clientHeight       //返回元素的高度（包括元素高度、内边距，不包括边框和外边距）
div.style.width         //返回元素的宽度（包括元素宽度，不包括内边距、边框和外边距）
div.style.height       //返回元素的高度（包括元素高度，不包括内边距、边框和外边距）
div.scrollWidth       //返回元素的宽度（包括元素宽度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientWidth相同
div.scrollHeight       //返回元素的高度（包括元素高度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientHeight相同
const rect = div.getBoundingClientRect();