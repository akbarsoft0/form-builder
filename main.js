$(document).ready(function () {
    'use strict';
    const T = ["number", "name", "password", "email", "tel", "url", "range", "color", "date", "time", "search", "file", "button", "submit", "reset"];
    let i = 1;
    $(".buttons").sortable({
        delay: 200
    });
    $(".empty").sortable({
        distance: 50
    });
    //making card header
    let head = (T, i) =>
        `<div class="card-header">
            <div class="card-heading">
            <div class="check-dad">
                <label for="${'L' + T + i}"><i class="fa-solid fa-pen"></i></label>
                <input type="checkbox" name="${'C' + T + i}" id="${'C' + T + i}"><label for="${'C' + T + i}" class="star"></label></div>
                <input type="text" name="${'L' + T + i}" placeholder="${T}" class="card-title" id="${'L' + T + i}" required>
            </div>
            <div class="card-btn">
                <i class="fa-solid fa-copy copy"></i>
                <i class="fa-solid fa-xmark x"></i>
            </div>
        </div>`;
    //making card body
    let body = (T, i) => `<div class="card-body">
    <input type="${T}" id="${T + i}" name="${T + i}" placeholder="input ${T} here..." ></div>`;
    // adding card head and body elements
    let card = (T, i) => `<li id="${T + i}">${head(T, i) + body(T, i)}</li>`;
    //making classes by T
    let classes = T.map(function (element) {
        return "." + element;
    });
    //making click events for classes
    classes.forEach((className, index) => {
        $(className).click(function () {
            $(".empty").append(card(T[index], i));
            i++;
        });
    });

    //header for select, checkbox, textarea and radio buttons
    let head2 = (name, i) => `<li id="${name + i}" class="${name}">${head(name, i)}`;

    //radio, checkbox starts
    let j = 1;
    let RI = (name) => `<input type="${name}" id="${name + j}" name="${name + i}" class"input-${name}">
    <label for="${name + j}" contenteditable>ask anything here?</label><br>`;
    let RC = (name) => {
        return `<li>${head2(name, i)}
        <div class="card-body">
            <div class="body-input">
                <ul class="text-info text-lowercase">
                    <li>click "+" button to add ${name}.</li>
                    <li>click mouse "left-key" to select.</li>
                    <li>click mouse "right-key" to edit on label.</li>
                </ul>
            </div>
            <div>
                <i class="fa-solid fa-plus add"></i><i class="fa-solid fa-minus minus"></i>
            </div>
        </div></li>`;
    };
    //radio button
    $('.radio').click(() => {
        $(".empty").append(RC("radio", i));
        i++, j++;
    });

    //checkbox button
    $('.checkbox').click(() => {
        $(".empty").append(RC("checkbox", i));
        i++, j++;
    });
    //radio add buttons
    $(".empty").on("click", ".radio .add", function () {
        $(this).closest('.card-body').find('.body-input').append(RI("radio"));
        j++;
    });
    //checkbox add buttons
    $(".empty").on("click", ".checkbox .add", function () {
        $(this).closest('.card-body').find('.body-input').append(RI("checkbox"));
        j++;
    });

    //radio,checkbox minus buttons
    $(document).on("click", ".empty .minus", function () {
        $(this).closest('.card-body').find('input:last, label:last, br:last').remove();
    });
    //radio, checkbox ends

    //textarea starts
    let TA = (name, i) => {
        return `<li>${head2(name, i)}<div class="card-body"><textarea name="${name + i}" id="${name + i}" 
        rows="6" placeholder="input ${name + i} here..."></textarea></div></li>`;
    };
    //textarea button
    $('.textarea').click(() => {
        $(".empty").append(TA("textarea", i));
        i++;
    });
    //textarea ends

    //select starts
    let SO = `<option value="option" contenteditable>option</option>`;
    let io = `<input type="text" placeholder="add option">`;
    let S = (name, i) => {
        return `<li>${head2(name, i)}<div class="card-body"><select class="select-box" name="${name + i}" id="${name + i}">
        ${SO + SO + SO}</select>
        <i class="fa-solid fa-pen edit"></i></div></li>`;
    };
    // select button
    $('.select').click(() => {
        $(".empty").append(S("select", i));
        i++;
    });
    // pop-up for select box
    function Edit() {
        return `<div class="pop-parent"><div class="pop-up">${io + io + io}
        <a type="submit" id="pop-save" class="pop-save">save</a>
         <i class="fa-solid fa-plus add"></i><i class="fa-solid fa-minus minus"></i>
        <i class="fa-solid fa-xmark pop-x"></i></div></div>`;
    }
    // select edit button
    $(".empty").on("click", ".edit", function () {
        $(".empty").append(Edit());
    });
    // pop-save button
    $(".empty").on("click", ".pop-save", function () {
        let options = $('.pop-parent input');
        $('select option').each(function (index) {
            $(this).text(options.eq(index).val());
            $(this).val(options.eq(index).val());
        });
        $(".pop-parent").hide();
    });
    $(".empty").on("click", ".pop-x", function () {
        $(".pop-parent").hide();
    });
    //select option & input add button
    $(".empty").on("click", ".add", function () {
        $('.select-box').append(SO);
        $('.pop-parent .pop-up').prepend(io);
    });
    //select option & input minus button
    $(".empty").on("click", ".minus", function () {
        $('.select-box option:last').remove();
        $('.pop-parent').find('.pop-up input:first').remove();

    });
    //select ends


    //main buttons
    //home button
    $('.home').click(function () {
        $('.buttons').slideToggle();
    });

    //undo button
    $('.undo').click(function () {
        $('.empty').empty();
    });
    // card-header buttons
    //copy button
    $(".empty").on("click", ".copy", function () {
        $(this).closest('li').clone().appendTo(".empty")
    });
    //remove button
    $(".empty").on("click", ".x", function () {
        $(this).closest("li").remove();
    });
});