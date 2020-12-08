let resim = $("#tantuniResim");
let dukkan={
    tantuni :0,
    masa : 8,
    doluMasa : 8,
    kasa : 10,
    garson:0,
    musteriSayi:0,
    bekleyenMusteri:0,
    paketSiparis : 0,
    tantuniFiyat:0,
    popularite:1.1,
    tarih:"",
    masaFiyat:500,
    etFiyat : 50,
    gramaj  : 0.2,
    mevcutEt : 1
}

let gecenGun = 0;

$(document).click(function(){
    bilgiYazdir();
});

$(document).ready(function(){
    bilgiYazdir();
});


function  bilgiYazdir() {
    $("#txtMevcutTantuni").html(dukkan.tantuni);
    $("#txtMasaSayi").html(dukkan.masa);
    $("#txtKGEtFiyat").html(dukkan.etFiyat + " TL");
    $("#txtKasa").html(dukkan.kasa+" TL");
    $("#txtMusteriSayi").html(dukkan.musteriSayi);
    $("#txtPopularite").html(dukkan.popularite.toFixed(2));
    $("#btnMasaAl").val("Masa Satın AL ("+dukkan.masaFiyat+") TL");
    $("#txtMevcutEt").html(dukkan.mevcutEt +" KG");
}

// OYUNA BAŞLA-BİTİR
$("#btnBasla").click(function(){
     inter1= setInterval(Update,100);
     inter2= setInterval(MusteriUpdate,5000);
     inter3 = setInterval(EnflasyonUpdate,30000);
     console.log("oyun başladı");
     $(this).prop('disabled',true);
     });
 
$("#btnBitir").click(function(){
     clearInterval(inter1);
     clearInterval(inter2);
     clearInterval(inter3);
     console.log("iflas ettiniz");
     $(this).prop('disabled',true);
});



$("#txtBirimFiyat").change(function(){
     dukkan.tantuniFiyat= $("#txtBirimFiyat").val();
    
    populariteHesapla();

});



function  populariteHesapla() {
    let yenipopi  = (dukkan.etFiyat / dukkan.tantuniFiyat) / 2  ;

    let masapopi  = dukkan.masa / 100;
    dukkan.popularite=yenipopi+masapopi;
}



$("#btnMasaAl").click(function () { 
        //kasada masa alacak para varsa
        if(dukkan.kasa>=dukkan.masaFiyat){
            dukkan.kasa-=dukkan.masaFiyat;   
            dukkan.masa++;
            //masanın yeni fiyatını hesapla
            dukkan.masaFiyat += parseInt(dukkan.masaFiyat * dukkan.popularite);
            $("#txtMevcutMasa").html(dukkan.masa);
            dukkan.popularite+= dukkan.masa / 10000; //Masalar popülariteye 1000 de etki edecek
            $(this).val("Masa Satın AL ("+dukkan.masaFiyat+") TL");
        }
});



$("#btnEtAl").click(function () {
        if(dukkan.kasa>=dukkan.etFiyat){
            dukkan.mevcutEt++;
            dukkan.kasa-=dukkan.etFiyat;
        }
})



//RESME TIKLANINCA ANİMASYON VE YAPILACAKLAR
let animDuration = 50;
$(resim).click(function (e) { 
     $(this).animate({
         width:"300px",
         height:"300px"
     },animDuration,function(){
        $(this).animate({
            width:"250px",
            height:"250px"
        },animDuration
        );
     });   //ANİMASYON YAPTIK
     
     if(dukkan.mevcutEt>=dukkan.gramaj){
        dukkan.tantuni++;
        dukkan.mevcutEt -= dukkan.gramaj;
        dukkan.mevcutEt = dukkan.mevcutEt.toFixed(2);
     }else{
         dukkan.mevcutEt=0;
     }    
     $("#txtMevcutTantuni").html(dukkan.tantuni);
    e.preventDefault();
});

let inter1,inter2,inter3;

//HER 1 SANİYEDE UPDATE
function Update() { 
    bilgiYazdir();
}



function EnflasyonUpdate() { 
  dukkan.etFiyat= Math.ceil(Math.random()*100);
  populariteHesapla();
}


//HER 3 SANİYEDE MÜŞTERİ UPDATE
function MusteriUpdate() { 
    dukkan.tarih = tarihYaz();
    $("#txtTarih").html(dukkan.tarih);

    let sayi = Math.ceil((Math.random()*dukkan.masa)* dukkan.popularite);
    dukkan.musteriSayi=sayi;
    for(i=1;i<=dukkan.musteriSayi;i++){
        if(dukkan.tantuni>0){
            dukkan.tantuni--;
            dukkan.kasa+= parseInt(dukkan.tantuniFiyat);
        }
        else{
            if(dukkan.musteriSayi>0){

                if(dukkan.popularite>0.2){
                    dukkan.popularite-= dukkan.musteriSayi / 50;
                }

            }     
            break;
        }
    }
    if(dukkan.musteriSayi<0){
        dukkan.musteriSayi=0;
    }

    if(dukkan.popularite<0.2){
        alert("iflas Ettiniz");
        location.reload();
    }
}


//HER MÜŞTERİ UPDATE YENİ BİR GÜN
function tarihYaz() {
    gecenGun++;
    var date = new Date();
    date.setDate(date.getDate() + gecenGun);
    var months = ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ",
         "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];
         return date.getDate()+" / "+months[date.getMonth()]+" / "+date.getFullYear();

}





