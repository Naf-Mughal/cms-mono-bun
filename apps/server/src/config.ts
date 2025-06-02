import mongoose from 'mongoose';
export const devConfig = {
    port: process.env.PORT,
    db_username: process.env.DATABASE_USERNAME || "",
    db_password: process.env.DATABASE_PASSWORD || "",
    db_name: process.env.DATABASE_NAME || "",
    db_host: process.env.DATABASE_HOST || "localhost",
    secret: process.env.SECRET_KEY || "",
    dev_db: process.env.DEV_DB,
    db_port: process.env.DATABASE_PORT || 3306,
    email: {
        FROM: process.env.EMAIL_FROM,
        USER: process.env.EMAIL_USER,
        PASSOWRD: process.env.EMAIL_PASSWORD,
        SERVICE: process.env.EMAIL_SERVICE
    },
    imagesPath: {
        userImage: process.env.USER_IMAGE || 'userImages',
    }
}

const { db_host, db_username, db_password, db_name, db_port } = devConfig;

export const configureDb = async () => {
    mongoose.Promise = global.Promise;

    const uri = db_username && db_password ? `mongodb://${db_username}:${db_password}@${db_host}/${db_name}?authSource=admin` : `mongodb://${db_host}:${db_port}/${db_name}`;
    console.log(uri);

    try {
        await mongoose.connect(uri);
        console.log('Database connected successfully!');
    } catch (err: any) {
        console.error('Could not connect to MongoDB..', err.message);
        console.error('Full error:', err);
    }
};