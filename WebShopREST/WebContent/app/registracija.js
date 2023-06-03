Vue.component("registracija", {
	data: function () {
		    
	},
	template: ` 
<div>
	<h1>Registracija korisnika</h1>
	<form action="">
            <table>
                <tr>
                    <td align="left">
                        <label>*Korisnicko ime: </label>
                    </td>
                    <td align="left">
                        <input name="korIme" type="text">
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Lozinka: </label>
                    </td>
                    <td align="left">
                        <input name="loz1" type="password" >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Ponovi lozinku: </label>
                    </td>
                    <td align="left">
                        <input name="loz2" type="password" >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Ime: </label>
                    </td>
                    <td align="left">
                        <input name="ime" type="text">
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Prezime: </label>
                    </td>
                    <td align="left">
                        <input name="prezime" type="text">
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>Pol: </label>
                    </td>
                    <td align="left">
                        <select>
                            <option>Musko</option>
                            <option>Zensko</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Datum rodjenja: </label>
                    </td>
                    <td align="left">
                        <input name="datumrodj" type="date">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td align="right">
                        <input type="submit" value="Registruj se"></button>
                    </td>
                </tr>
            </table>
        </form>
</div>		  
`
	, 
	methods : {
	}
});