async function createKomik(database, komikData){
    const {title, description, author, imageType, imageName, imageData} = komikData;

    if (!title || !description ||!author) {
        throw new Error('Title, description, and author wajib diisi.');
    }

    const newKomik = await database.Komik.create({
        title,
        description,
        author,
        imageType: imageType || null,
        imageName: imageName || null,
        imageData: imageData || null,
    });

    return newKomik;
}

async function getAllKomiks(database){
    const komiks = await database.Komik.findAll();

    return komiks.map(k => {
        if (k.imageData){
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    });
}
async function getKomikById(database, id){
    const komik = await database.Komik.findByPk(id);
    if (!komik) 
        throw new Error('Komik tidak ditemukan');
}

async function updateKomik(database, id, komikData){
    const komik = await database.Komik.findByPk(id);
    if (!komik){
        throw new Error(`komik dengan id ${id} tidak ditemukan`);
    }

    await komik.update(komikData);
    return komik;
}


async function deleteKomik(database, id){
    const komik = await database.Komik.findByPk(id);
    if (!komik)
        throw new Error(`komik dengan id ${id} tidak ditemukan`);
    await komik.destroy();
    return { message: `komik dengan id${id} berhasil dihapus`};
}


module.exports = {
    createKomik,
    getAllKomiks,
    getKomikById,
    updateKomik,
    deleteKomik
};
    