import React, { useEffect, useState } from 'react'
import User from './User'

const HomePage = () => {
    const [projeler, setprojeler] = useState([]);
    const [text, settext] = useState("");
    const [categori, setcategori] = useState([]);
    const [newItem, setnewItem] = useState([]);

    // KART EKLE
    const addCard = () => {
        setprojeler([...projeler, { "degisebilir": true, "save": false, "baslik": "", "todo": [] }]);
        const scroll = document.querySelector(".arearight").scrollHeight;
        document.querySelector(".arearight").scrollTo(0, scroll);
        let checkboxsayi = document.querySelectorAll(".categoricheckbox").length;
        for (let i = 0; i < checkboxsayi; i++) {
            document.querySelectorAll(".categoricheckbox")[i].checked = false
        }
    }
    //OLUŞTURULAN KARTIN BAŞLIĞINI DEĞİŞTİR
    const changeBaslik = (e, index) => {
        let yeniProjeler = projeler;
        yeniProjeler[index].baslik = e.target.value;
        setprojeler([...yeniProjeler]);

    }
    //OLUŞTURULAN KARTIN TODO GİRİŞİ
    const addTodo = (index) => {
        if (text !== "") {
            let yeniProjeler = projeler;
            yeniProjeler[index].todo.push({ text, "isComplete": false });
            setprojeler([...yeniProjeler]);
            settext("");
            document.getElementById("item-" + index).value = ""
        }
    }
    //KARTIN OLUŞTURULAN TODOLARI SİL
    const deleteTodo = (projeIndex, todoIndex) => {
        let yeniProjeler = projeler;
        yeniProjeler[projeIndex].todo = yeniProjeler[projeIndex].todo.filter((x, i) => i !== todoIndex)
        setprojeler([...yeniProjeler]);
    }
    //KARTI SİL
    const deleteCard = (projeIndex) => {
        let yeniProjeler = projeler.filter((x, i) => i !== projeIndex)
        setprojeler([...yeniProjeler]);
    }
    //TODO OLUŞTURMAK İÇİN VERİLERİ DEPOLA
    const changeValue = (e) => {
        settext(e.target.value);
    }
    //SEÇİLEN KATEGORİYİ FİLTRELE
    const selectCategories = (check, baslik) => {
        let checkedBox = 0;
        let checkboxsayi = document.querySelectorAll(".categoricheckbox").length;
        for (let i = 0; i < checkboxsayi; i++) {
            let checkboxs = document.querySelectorAll(".categoricheckbox")[i].checked;
            checkedBox += Number(checkboxs)
        }
        if (check.target.checked) {
            if (checkedBox === 1) {
                let yeniProjeler1 = projeler.filter((x) => x.baslik === baslik);
                setnewItem([...yeniProjeler1]);
            } else {
                let yeniProjeler2 = projeler.filter((x) => x.baslik === baslik);
                setnewItem([...newItem, ...yeniProjeler2]);
            }

        } else {
            if (checkedBox === 0) {
                setnewItem(projeler)
            } else {
                let yeniProjeler3 = newItem.filter((x) => x.baslik !== baslik);
                setnewItem([...yeniProjeler3]);
            }
        }
    }
    // TODO KAYDET
    const saveTodo = (index) => {
        let yeniProjeler = projeler;
        yeniProjeler[index].degisebilir = false;
        yeniProjeler[index].save = true;
        setprojeler([...yeniProjeler]);
    }
    //TODO DÜZENLE
    const editTodo = (index) => {
        let yeniProjeler = projeler;
        yeniProjeler[index].degisebilir = true;
        yeniProjeler[index].save = false;
        setprojeler([...yeniProjeler]);
    }
    //TAMAMLANMIŞ TODO
    const completeTodo = (e, projeindex, todoindex) => {
        if (e.target.checked) {
            let yeniProjeler = projeler;
            yeniProjeler[projeindex].todo[todoindex].isComplete = true;
            setprojeler([...yeniProjeler]);
        } else {
            let yeniProjeler = projeler;
            yeniProjeler[projeindex].todo[todoindex].isComplete = false;
            setprojeler([...yeniProjeler]);
        }
    }
    useEffect(() => {
        let categoriName = projeler.map((x) => x.baslik);
        let uniqCategori = [...new Set(categoriName)];
        setcategori(uniqCategori);
        setnewItem(projeler)
    }, [projeler])
    return (
        <div className="homepage">
            <div className="arealeft">
                <User />
                <div className="categories">
                    {categori.map((baslik, i) => (
                        <div key={i} className="categori">
                            <input className="categoricheckbox" type="checkbox" onChange={(x) => selectCategories(x, baslik)} />
                            <span>{baslik}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="arearight">
                <div className="todos">
                    {newItem.map((proje, projeIndex) => (
                        <div className="todo" key={"pr" + projeIndex} >
                            {proje.save &&
                                <div className="savepanel">
                                    <button className="savebutton" onClick={() => editTodo(projeIndex)}>Edit</button>
                                    <button className="savebutton" onClick={() => deleteCard(projeIndex)}>Delete</button>
                                </div>}
                            <div className="cardname">
                                <input placeholder="Card Name" value={proje.baslik} onChange={(e) => changeBaslik(e, projeIndex)} />
                                {proje.degisebilir && <button onClick={() => deleteCard(projeIndex)}>Card Delete</button>}
                            </div>
                            {proje.degisebilir &&
                                <div className="addtodo">
                                    <input onChange={changeValue} placeholder="Add TO-DO" id={"item-" + projeIndex} />
                                    <button onClick={() => addTodo(projeIndex)}>Add</button>
                                </div>}
                            {proje.todo.map((item, todoIndex) => (
                                <div className="texttodo" key={"tr" + todoIndex}>
                                    <div className="todointext">
                                        <input checked={item.isComplete ? true : false} type="checkbox" onChange={(e) => completeTodo(e, projeIndex, todoIndex)} />
                                        <p style={{ textDecoration: item.isComplete ? "line-through" : "" }}>{item.text}</p>
                                    </div>
                                    <button onClick={() => deleteTodo(projeIndex, todoIndex)}>Delete</button>
                                </div>
                            ))}
                            <button className="cardsave" onClick={() => saveTodo(projeIndex)}>Save</button>
                        </div>
                    ))}
                </div>
                <div className="addcard">
                    <button onClick={addCard}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
