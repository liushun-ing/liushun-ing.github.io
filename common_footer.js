let footer = document.createElement('footer');
footer.innerHTML = `
<div class="bottom">
    <div class="first-line">
        © <span>2021-2022</span>&nbsp;
        <a class="github-name" href="https://github.com/liushun-ing" 
            target="_blank">liushun-ing</a>       
    </div>
    <div class="second-line">
        <span>Hunan University</span>&nbsp;&nbsp;
        <span>Software Engineering</span>
    </div>
</div>
`
//插入到最后面
document.body.appendChild(footer);