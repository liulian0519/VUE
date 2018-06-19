# my-blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
#### my-blog�ܽ�
> ʵ�ֹ��ܣ����˲���ҳչʾ�Լ���������Ӳ��ͣ��޸Ĳ��ͣ�ɾ������
> �����Add-blog:��Ӳ���
    
```
 axios.post("/posts.json",this.blog)
                .then((data)=> {
                  this.submited=true
                })
```
> �����signalBlog���������ͣ��൱������ҳ��
ͨ��id��������չʾҳ�棬����ɾ���ͱ༭������ť
```
  data(){
          return{
            id:this.$route.params.id,
            blog:{}       //��id��Ӧ�Ĳ���
          }
      },
      created(){
          axios.get('/posts/'+this.id + '.json')
            .then(function (data) {
              return data.data
            })
            .then((data)=> {
               console.log(data);
              this.blog = data
            })
      },
      methods:{
        DeleteSignalBlog(){
          axios.delete('/posts/'+this.id + ".json")  //ɾ��ģ��
            .then(response=>{
              this.$router.push({path:'/'});
              alert("ɾ���ɹ�");
            })
        }
      }
```

> �����EditBlog :�༭����
ע�⴫�Σ������������ҳ���õ�id ����������޸ģ�
```
 methods:{
      fetchData(){
        axios.get('/posts/'+this.id + ".json")
          .then(response=>{
            console.log(response.data)
            // console.log(response.body);g
             this.blog = response.data
          })
      },
      post:function () {
        //���Լ�bianji�Ĳ�����Ϣд��fire Bases��
        // _this =this
        axios.put('/posts/'+this.id + ".json",this.blog)
          .then( (data)=> {
           this.submited = true
            // console.log(data);
            // this.submited=true
          })
      }
```
> ����ģ��
```
   <input type="text" placeholder="����" v-model="search">
   
     //���û�������ƥ��
      computed:{
          filteredBlogs:function () {
            return this.blogs.filter((blog)=>{
              //ƥ��search�� title �Ƿ�һ��
              return blog.title.match(this.search)
            })
          }
      },
      
       <!--֮ǰ�������� blog     ����Ӧ�ñ���computed ��ߵ��Ǹ�filterBlogs-->
      
    <div v-for="signal in filteredBlogs" class="signal-blog">
        <router-link :to="'/blog/'+signal.id">{{signal.title}}</router-link>    //ǰ������תid
        <article>
          {{signal.contentr}}
        </article>
      </div>
```
> ·��
```
export default [
  {path:'/',component:ShowBlogs},
  {path:'/add',component:AddBlog},
  {path:'/blog/:id',component:SignalBlog},      //localhost��8080/blog/1
  {path:'/edit/:id',component:EditBlog},
]

```

---
2018/6