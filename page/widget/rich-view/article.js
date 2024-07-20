const app = getApp();

Page({

  data: {

  },

  onShow() {
    app.onShowPage(this);

    let richview = this.selectComponent('#article');
    richview.setRichText(`
    <h2>习言道｜该改的、能改的我们坚决改</h2>
    <p>2024-07-17 08:58:37 中国新闻网 </p>
    <p>　　改革开放是决定当代中国命运的关键一招，也是决定中国式现代化成败的关键一招。习近平总书记围绕全面深化改革作出一系列重要论述，强调要把全面深化改革作为推进中国式现代化的根本动力。</p>
    <p><img style="border:0px solid #000000" src="http://i2.chinanews.com.cn/simg/cmshd/2024/07/17/aab6eef3b551433e9528dccb7a1fb5ef.jpg" alt=""></p>
    <p><img style="border:0px solid #000000" src="http://i2.chinanews.com.cn/simg/cmshd/2024/07/17/c012ba385ed44772a6bf34cd4b380cde.jpg" alt=""></p>
    <p><img style="border:0px solid #000000" src="http://i2.chinanews.com.cn/simg/cmshd/2024/07/17/69435fcbbf8d40169cadb83f5c0c59c1.jpg" alt=""></p>
    <p><img style="border:0px solid #000000" src="http://i2.chinanews.com.cn/simg/cmshd/2024/07/17/a244b5a9273c458cae28bcc45ae4d92b.jpg" alt=""></p>
    <p><img style="border:0px solid #000000" src="http://i2.chinanews.com.cn/simg/cmshd/2024/07/17/02844292f6484ebfa52c792db779a3ab.jpg" alt=""></p>
    <p><img style="border:0px solid #000000" src="http://i2.chinanews.com.cn/simg/cmshd/2024/07/17/1274c02e8e8c423daa306d58589d0b78.jpg" alt=""></p>
    <p class="wdtop" style="text-align:right;margin-right:0px;font-size:18px;color:#808080;">责任编辑:张子怡</p>
    `);
  },  

})