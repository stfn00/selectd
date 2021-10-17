# selectd

A lightweight JavaScript snippet for create and manage custom ```<select>``` HTML.



## Installation

Download/clone this repo and include the files located in the ```dist``` directory in your project:<br>
```dist/js/selectd.min.js ```<br>
and<br>
```dist/css/selectd.css```

#### CSS
Include ```selectd.css```
```html
<link rel="stylesheet"  href="PATH_TO/css/selectd.css">
```

#### JS
Include ```selectd.min.js``` and call ```Selectd()``` Class to initialize.
```html
<script type="text/javascript"  src="PATH_TO/js/selectd.min.js"></script>
<script type="text/javascript">
    window.addEventListener('load', () => {
        new Selectd();
    });
</script>
```



## Usage

To initialize custom select, wrap ```<select>``` inside a ```<div>``` with class name ```<div class="selectd">```

*Example Markup*
```html
<div class="selectd">
    <select name="example-2" id="example-2" required multiple>
        <option value="">Select car:</option>
        <option value="audi" hidden>Audi</option>
        <option value="ferrari">Ferrari</option>
        <option value="mercedes" disabled>Mercedes</option>
        <option value="ford">Ford</option>
    </select>
</div>
```

Note that the first option is used only as placeholder of the select.

#### HTML result

*Example Markup*
```html
<div class="selectd">
    <select name="example-2" id="example-2" required multiple>
        <option value>Select car:</option>
        <option value="audi" hidden>Audi</option>
        <option value="ferrari">Ferrari</option>
        <option value="mercedes" disabled>Mercedes</option>
        <option value="ford">Ford</option>
    </select>
    <div class="selectd-container">Select car:</div>
    <div class="selectd-items selectd-items--hide">
        <div class="selectd-items__item selectd-items__item--hidden">Audi</div>
        <div class="selectd-items__item">Ferrari</div>
        <div class="selectd-items__item selectd-items__item--disabled">Mercedes</div>
        <div class="selectd-items__item">Ford</div>
    </div>
</div>
```

#### Attributes support

With selectd you can also use the most common attributes:

on ```<select>```

| Attribute | Support |
| --- | --- |
| `autofocus` | NO |
| `disabled` | YES |
| `form` | NOT NEEDED |
| `multiple` | YES |
| `name` | NOT NEEDED |
| `required` | YES |
| `size` | NO |

on ```<option>```

| Attribute | Support |
| --- | --- |
| `disabled` | YES |
| `selected` | YES |
| `value` | YES |
| `hidden` | YES |



## Options

#### List of available settings

*Example usage*
```javascript
new Selectd({
    selector: '.selectd',
    debug: false
});
```

#### Reference

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| ```selector``` | *String* | .selectd | Selector to initialize custom select |
| ```debug``` | *Boolean* | false | Trace click on select options |



## Todo

- ```selected``` attribute in ```<option>``` only works once for multiple select
- ```<optgroup>``` support
