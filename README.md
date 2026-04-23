# ToDoToDo - 待办事项管理平台

一款简洁实用的待办事项管理平台，用于统筹个人工作、学习、生活的待办事项。

## 技术栈

- **前端**: Angular 15.2 + TypeScript
- **后端**: Java 8 + Spring Boot 2.7
- **数据库**: MySQL 8.0+
- **构建工具**: Maven (后端)、npm (前端)

## 功能特性

- ✅ 待办事项添加、编辑、删除
- ✅ 待办状态管理（待办/进行中/已完成）
- ✅ 搜索待办事项
- ✅ 分类管理（工作/学习/生活）
- ✅ 优先级设置（高/中/低）
- ✅ 截止日期设置
- ✅ 待办提醒功能
- ✅ 柔和配色，简洁界面

## 项目结构

```
ToDoToDo/
├── todotodo-backend/          # Spring Boot 后端项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/todotodo/
│   │   │   │   ├── controller/      # REST控制器
│   │   │   │   ├── entity/          # 实体类
│   │   │   │   ├── repository/      # 数据访问层
│   │   │   │   ├── service/         # 业务逻辑层
│   │   │   │   └── ToDoToDoApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties  # 应用配置
│   │   │       └── schema.sql              # 数据库脚本
│   │   └── test/
│   └── pom.xml
│
└── todotodo-frontend/         # Angular 前端项目
    ├── src/
    │   ├── app/
    │   │   ├── components/         # 组件
    │   │   ├── models/             # 数据模型
    │   │   ├── services/           # 服务层
    │   │   ├── app.component.*
    │   │   └── app.module.ts
    │   ├── environments/           # 环境配置
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## 快速开始

### 前置条件

确保您的系统已安装以下软件：

1. **Java JDK 8** 或更高版本
2. **Maven 3.6+**
3. **Node.js 16+** 和 **npm 8+**
4. **MySQL 8.0+**
5. **Angular CLI 15.x** (可选，建议安装)
   ```bash
   npm install -g @angular/cli@15
   ```

### 步骤一：配置数据库

1. 启动 MySQL 服务

2. 创建数据库和表（可选，应用启动时会自动创建）
   
   手动执行 `todotodo-backend/src/main/resources/schema.sql` 脚本：

   ```sql
   CREATE DATABASE IF NOT EXISTS todotodo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. 修改数据库连接配置（如需）

   编辑 `todotodo-backend/src/main/resources/application.properties`：

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/todotodo?useUnicode=true&characterEncoding=utf8mb4&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=root  # 修改为您的密码
   ```

### 步骤二：启动后端服务

1. 进入后端项目目录：
   ```bash
   cd todotodo-backend
   ```

2. 使用 Maven 构建并运行：
   ```bash
   mvn spring-boot:run
   ```

   或者先打包再运行：
   ```bash
   mvn clean package
   java -jar target/todotodo-backend-1.0.0.jar
   ```

3. 验证后端启动成功

   后端服务将在 **http://localhost:8080** 启动。

   测试 API：
   ```bash
   curl http://localhost:8080/api/todos
   ```

   应该返回一个空的 JSON 数组 `[]`。

### 步骤三：启动前端服务

1. 打开新的终端窗口，进入前端项目目录：
   ```bash
   cd todotodo-frontend
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   ng serve
   ```

   或者使用 npm 脚本：
   ```bash
   npm start
   ```

4. 验证前端启动成功

   前端应用将在 **http://localhost:4200** 启动。

   打开浏览器访问该地址，您应该能看到待办事项管理平台的界面。

## 功能验证

### 1. 添加待办事项

1. 点击页面右上角的 **"新建待办"** 按钮
2. 填写待办表单：
   - 标题（必填）：例如"完成项目文档"
   - 描述（可选）：详细描述待办事项
   - 状态：待办/进行中/已完成
   - 优先级：高/中/低
   - 分类：工作/学习/生活
   - 截止日期：选择日期和时间
   - 提醒：勾选后设置提醒时间
3. 点击 **"创建待办"** 按钮
4. 验证：待办事项应出现在"待办事项"列表中

### 2. 状态管理

1. 在待办事项卡片上点击左侧复选框
2. 验证：
   - 勾选后，待办事项会移到"已完成"标签页
   - 取消勾选后，待办事项会移回"待办事项"列表

### 3. 编辑待办事项

1. 将鼠标悬停在待办事项卡片上
2. 点击 **"编辑"** 按钮
3. 修改表单内容
4. 点击 **"保存修改"** 按钮
5. 验证：待办事项内容应已更新

### 4. 删除待办事项

1. 将鼠标悬停在待办事项卡片上
2. 点击 **"删除"** 按钮
3. 在确认对话框中点击 **"确定"**
4. 验证：待办事项应从列表中消失

### 5. 搜索功能

1. 在顶部搜索框中输入关键词（如"项目"）
2. 验证：列表应只显示标题或描述包含该关键词的待办事项
3. 点击搜索框右侧的 × 按钮清除搜索
4. 验证：应恢复显示所有待办事项

### 6. 标签页切换

1. 点击 **"待办事项"** 标签：显示所有未完成的待办
2. 点击 **"已完成"** 标签：显示所有已完成的待办

### 7. 提醒功能（可选）

1. 创建或编辑待办时勾选 **"设置提醒"**
2. 选择一个即将到来的时间（如1分钟后）
3. 保存待办
4. 确保浏览器已允许通知权限
5. 验证：到达提醒时间时，浏览器应弹出系统通知

## API 接口

后端提供以下 RESTful API：

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/todos | 获取所有待办 |
| GET | /api/todos/{id} | 根据ID获取待办 |
| POST | /api/todos | 创建新待办 |
| PUT | /api/todos/{id} | 更新待办 |
| DELETE | /api/todos/{id} | 删除待办 |
| PATCH | /api/todos/{id}/status | 更新待办状态 |
| GET | /api/todos/status/{status} | 按状态获取待办 |
| GET | /api/todos/search?keyword=xxx | 搜索待办 |
| GET | /api/todos/pending | 获取未完成待办 |
| GET | /api/todos/completed | 获取已完成待办 |

## 常见问题

### Q1: 后端启动失败，提示无法连接数据库

**解决方案**：
- 确保 MySQL 服务已启动
- 检查 `application.properties` 中的数据库连接配置
- 确认用户名和密码正确
- 确认数据库 `todotodo` 已创建

### Q2: 前端无法访问后端 API

**解决方案**：
- 确认后端服务已在 8080 端口启动
- 检查浏览器控制台是否有 CORS 错误
- 后端已配置跨域支持，允许 http://localhost:4200 访问

### Q3: 提醒功能不工作

**解决方案**：
- 确保浏览器已允许通知权限
- 在 Chrome/Edge 中：设置 > 隐私和安全 > 网站设置 > 通知
- 确保系统时间设置正确
- 提醒检查每分钟执行一次，请耐心等待

### Q4: Maven 下载依赖慢

**解决方案**：
配置 Maven 镜像源，在 `settings.xml` 中添加阿里云镜像：

```xml
<mirrors>
    <mirror>
        <id>aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Aliyun Maven Mirror</name>
        <url>https://maven.aliyun.com/repository/central</url>
    </mirror>
</mirrors>
```

## 开发说明

### 本地开发

后端使用 Spring Boot DevTools（如需可自行添加）支持热重载。

前端使用 `ng serve` 时，修改代码会自动重新编译并刷新浏览器。

### 生产部署

**后端**：
```bash
cd todotodo-backend
mvn clean package -DskipTests
java -jar target/todotodo-backend-1.0.0.jar
```

**前端**：
```bash
cd todotodo-frontend
ng build --configuration production
```
构建产物在 `dist/todotodo-frontend/` 目录，可部署到 Nginx 等静态文件服务器。

## 更新日志

- v1.0.0 (2026-04-23)
  - 初始版本发布
  - 支持待办的增删改查
  - 支持搜索和筛选
  - 支持提醒功能
  - 简洁美观的界面设计
