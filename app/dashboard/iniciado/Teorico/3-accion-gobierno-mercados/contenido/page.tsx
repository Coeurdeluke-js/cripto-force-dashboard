import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function Modulo3Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Botón Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Criptomonedas. Herramientas Económicas</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Módulo 3: La acción del gobierno en los mercados</h2>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Acción del Gobierno en los Mercados</h3>
          <h4 className="text-md font-semibold mb-2">Control de precios</h4>
          <p className="mb-2"><b>Precio máximo:</b> El precio más alto al que legalmente se puede vender un bien.</p>
          <p className="mb-2"><b>Precio mínimo:</b> El precio más bajo al que legalmente se puede vender un bien.</p>
          <p className="mb-2">En esta sección empezaremos analizando aquellas políticas que buscan controlar directamente los precios. Por ejemplo, las leyes de control del alquiler establecen el canon de alquiler máxima que el arrendador puede cobrar a los arrendatarios; por su parte, las leyes de salario mínimo determinan el salario más bajo que las empresas pueden pagar a sus trabajadores. Usualmente, los controles de precios entran en vigor cuando los diseñadores de políticas creen que el precio de mercado de un bien o servicio es injusto para los compradores o vendedores. Como se verá, estas políticas, por su parte, también generan desigualdades.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Los controles de precios</h3>
          <p className="mb-2">Si un bien se vende en un mercado competitivo, libre de regulación gubernamental, su precio se ajustará para equilibrar la oferta y la demanda: al precio de equilibrio, la cantidad del bien que los compradores están dispuestos a comprar es exactamente igual a la cantidad que los vendedores están dispuestos a vender.</p>
          <p className="mb-2">Es posible que no todos estén satisfechos con los resultados de este proceso de libre mercado. Suponga que la Asociación de Consumidores libres se queja, pues opina que el precio de equilibrio es muy alto para que todos disfruten lo que desean. Mientras tanto, la Organización Nacional de Productores desaprueba el precio de equilibrio (resultado de la "competencia implacable"), pues es demasiado bajo y reduce los ingresos de sus miembros. Cada uno de estos grupos presiona para que el gobierno apruebe leyes que alteren los resultados del mercado mediante el control directo del precio de mercado.</p>
          <p className="mb-2">Debido a que los compradores de cualquier bien quieren siempre el precio más bajo, mientras que los vendedores buscan siempre el precio más alto, los intereses de ambos grupos entran en conflicto permanentemente. Si la Asociación de Consumidores Libres tiene éxito en su reclamo, el gobierno impondrá un precio máximo legal al que podrá venderse cada bien en cuestión.</p>
          <p className="mb-2">Como no se permite que el precio aumente por encima de este nivel, este tope máximo autorizado se llama precio máximo. En contraste, si los productores son los que tienen éxito, el gobierno impondrá un mínimo legal al precio. Como el precio no puede caer por debajo de este nivel, el mínimo autorizado se llama precio mínimo.</p>
          <p className="mb-2">Cuando el gobierno, presionado por las quejas y las contribuciones de la Asociación de Consumidores a las campañas políticas, impone un precio máximo en el mercado del bien, hay dos resultados posibles: si el gobierno impone un precio máximo por arriba del precio de equilibrio será un precio máximo sin efecto. Ahora bien si el precio máximo lo establece por debajo del precio de equilibrio genera un exceso de demanda (escasez o desabastecimiento), dado que los consumidores a este nuevo precio querrán consumir más y los oferentes llevarán menos bienes al mercado.</p>
          <p className="mb-2 italic">Ver video: Precios Maximos (1985)</p>
          <p className="mb-2">Por otro lado cuando el gobierno presionado por las quejas de los oferentes impone un precio mínimo en el mercado de un bien o servicio, nuevamente hay dos resultados posibles: si coloca un precio mínimo por debajo del precio de equilibrio sería una medida sin efecto, pero si coloca un precio mínimo por arriba del precio de equilibrio genera automáticamente un exceso de oferta. Con precio mínimo legal establecido, el productor quiere llevar más bienes al mercado y el consumidor desea menos, generando un sobrestock.</p>
          <p className="mb-2 italic">Ver video: Milton Friedman Sobre el Salario minimo</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">El control del alquiler a corto y largo plazo</h3>
          <p className="mb-2">El control del alquiler es un ejemplo común del precio máximo. En muchas ciudades, el gobierno local impone un tope a las tarifas de alquiler que los arrendadores pueden cobrar a los arrendatarios. El objetivo de esta política es volver más accesible el costo de la vivienda para ayudar a los que menos tienen.</p>
          <p className="mb-2">Los economistas frecuentemente critican el control del alquiler, pues sostienen que es una forma muy ineficiente de ayudar a los pobres a mejorar su nivel de vida. Un economista llamó al control del alquiler "la mejor forma de destruir una ciudad, además de bombardearla".</p>
          <p className="mb-2">Los efectos negativos del control del alquiler son menos evidentes para la población en general, pues éstos ocurren a lo largo de muchos años. A corto plazo, los arrendadores tienen un número fijo de departamentos para alquilar y no pueden ajustar este número tan pronto como cambian las condiciones de mercado. Por otro lado, el número de personas que buscan vivienda en una ciudad no es muy sensible a las tarifas de alquiler a corto plazo, porque las personas tardan en ajustar sus condiciones de vivienda. Entonces, la oferta y la demanda de vivienda a corto plazo son relativamente inelásticas.</p>
          <p className="mb-2">Ergo, como sucede con cualquier precio máximo obligatorio, el control del alquiler causa escasez. Sin embargo, como la oferta y la demanda son inelásticas a corto plazo, la escasez inicial causada por el control del alquiler es pequeña. El efecto primario a corto plazo es reducir las tarifas del alquiler.</p>
          <p className="mb-2">A largo plazo la historia es muy diferente, pues los compradores y vendedores de los inmuebles en alquiler responden más a las condiciones del mercado conforme transcurre el tiempo. Por el lado de la oferta, los arrendadores responden a las tarifas del alquiler bajas dejando de construir nuevos departamentos y evitando dar mantenimiento a las viviendas ya existentes. Por el lado de la demanda, las rentas bajas alientan a las personas a buscar sus propios departamentos (en lugar de vivir con sus padres o compartir los departamentos con sus compañeros) e inducen la migración de más personas a la ciudad. Entonces, a largo plazo, tanto la oferta como la demanda son más elásticas.</p>
          <p className="mb-2">En las ciudades donde hay control del alquiler, los propietarios usan varios mecanismos para racionar las viviendas. Algunos arrendadores mantienen largas listas de espera. Otros dan preferencia a arrendatarios sin hijos pequeños o sin animales. Algunos departamentos son asignados a quienes estén dispuestos a ofrecer pagos "por debajo de la mesa". En esencia, estos sobornos hacen que el precio total del departamento (incluido el soborno) se acerque al precio de equilibrio.</p>
          <p className="mb-2">Debemos recordar uno de los Diez principios de la economía para entender en su totalidad los efectos del control del alquiler: las personas responden a los incentivos. En los mercados libres, los arrendadores tratan de mantener sus edificios limpios y seguros, pues los departamentos más deseables son los que se cotizan a precios más altos. Por el contrario, cuando el control del alquiler causa escasez y listas de espera, los propietarios pierden el incentivo para responder a las necesidades de sus inquilinos. ¿Por qué habría de invertir dinero para mantener y mejorar el inmueble cuando las personas están esperando habitarlo en las condiciones en las que se encuentra? Al final, los arrendatarios obtienen tarifas del alquiler más bajas, pero también viviendas de menor calidad.</p>
          <p className="mb-2">Los diseñadores de políticas reaccionan a los efectos del control del alquiler con la imposición de regulaciones adicionales. Sin embargo, es difícil y costoso hacer cumplir estas leyes. En contraste, cuando el control del alquiler se elimina y las fuerzas de la competencia regulan el mercado de la vivienda, dichas leyes son menos necesarias. En un mercado libre, el precio de la vivienda se ajusta para eliminar la escasez que da lugar a un comportamiento indeseable de los propietarios.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">El salario mínimo</h3>
          <p className="mb-2">El salario mínimo es un ejemplo importante del precio mínimo. Las leyes sobre el salario mínimo establecen el precio más bajo del trabajo que los empleadores pueden pagar.</p>
          <p className="mb-2">Con el fin de examinar los efectos del salario mínimo, debemos considerar el mercado laboral. Los trabajadores determinan la oferta de trabajo y las empresas determinan la demanda. Si el gobierno no interviene, el salario normalmente se ajusta para balancear la oferta y la demanda de trabajo.</p>
          <p className="mb-2">Para comprender en su totalidad el salario mínimo, es importante tener en mente que la economía comprende no sólo un mercado laboral, sino muchos mercados laborales destinados a diferentes tipos de trabajadores. El impacto del salario mínimo depende de las habilidades y la experiencia del trabajador. Los trabajadores altamente capacitados y con vasta experiencia no se verán afectados porque sus salarios de equilibrio ya están muy por encima del salario mínimo. Para estos trabajadores, el salario mínimo no actúa como una restricción obligatoria.</p>
          <p className="mb-2">El salario mínimo tiene su mayor impacto en el mercado laboral de los adolescentes. Los salarios de equilibrio de los jóvenes son bajos porque los adolescentes se encuentran entre los miembros de la fuerza de trabajo con menos habilidades y experiencia. Además, los adolescentes a menudo están dispuestos a aceptar un salario menor a cambio de capacitación práctica en el trabajo.</p>
          <p className="mb-2">Uno de los Diez principios de la economía que los mercados son, por lo general, una buena manera de organizar la actividad económica. Este principio explica por qué los economistas se oponen regularmente a los precios máximos y mínimos. Para ellos, los precios no son el resultado de procesos arbitrarios. Los precios son el resultado de millones de decisiones de empresas y consumidores que constituyen la base de las curvas de la oferta y la demanda. Los precios desempeñan la función crucial de equilibrar la oferta y la demanda y, por tanto, de coordinar la actividad económica. Cuando los encargados de formular las políticas económicas fijan los precios por decreto, oscurecen las señales que normalmente guían la distribución de los recursos de la sociedad.</p>
          <p className="mb-2">Otro de los Diez principios básicos de la economía es que los gobiernos pueden (en ocasiones) mejorar los resultados del mercado. De hecho, los diseñadores de políticas buscan controlar los precios porque consideran que los resultados del mercado son injustos. Los controles de precios están encaminados a ayudar a los pobres. Por ejemplo, las leyes sobre el control del alquiler tratan de que la vivienda sea accesible para todos, y las leyes sobre el salario mínimo tratan de ayudar a las personas a escapar de la pobreza.</p>
          <p className="mb-2">A pesar de esto, los controles de precios perjudican a aquellos a quienes tratan de ayudar. El control del alquiler mantiene bajas las rentas, pero también disuade a los propietarios de dar mantenimiento a sus propiedades y dificulta encontrar vivienda. Las leyes sobre el salario mínimo posiblemente aumentan el salario de algunos trabajadores, pero también causan que otros estén desempleados.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Acción de los Gobiernos Nacionales, Provinciales y Bancos Centrales con las Criptomonedas</h3>
          <p className="mb-2">En la mayoría de los países sus leyes actuales no prevén la existencia de una criptodivisa como el Bitcoin, por lo que aún se encuentran sin un marco legal. En parte, esto se debe a que Bitcoin no se adapta enteramente a la definición existente de moneda u otros instrumentos financieros, por lo que las leyes existentes no se le son totalmente aplicables.</p>
          <p className="mb-2">Pero dada la creciente popularidad, y el mayor uso que se le está dando al Bitcoin, algunos países ya están creando un marco legal para la criptodivisa. En Nueva York por ejemplo se estableció un control a los "cambiadores", es decir, a las personas que reciben las monedas de uso en el mundo como el dólar o el euro por Bitcoin. "Los reguladores exigen que estas personas deben estar registradas ante la autoridad competente", indican autoridades neoyorkinas.</p>
          <p className="mb-2">Alemania es otra nación que ha realizado esfuerzos en esta materia. Luego de reconocer al Bitcoin como una moneda, fijó un pago de impuesto, por lo que todos los registros que tenga una empresa por este tipo de operaciones deben ser reportados. Canadá y Japón han adoptado ideas similares de protección a las EEUU y en Latinoamérica, México, Brasil y Argentina también han establecido ciertas regulaciones.</p>
          <p className="mb-2">En Rusia han postergado la prohibición del Bitcoin, dado que de acuerdo a las autoridades del Banco Central de Rusia primero desean obtener un entendimiento completo de la criptomoneda para luego construir un marco legal adecuado.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Caso Argentina (Fuente BCRA)</h3>
          <p className="mb-2">El BCRA avanzó semanas pasadas en su plan para pedir información a bancos y fintech sobre las operaciones realizadas con criptomonedas, algo que muchos agentes del sistema financiero comienzan a ver como el adelanto a alguna normativa para controlar esa operatoria o, por lo menos, tener registrados a aquellos que la realizan. Desde el BCRA se explicó que el origen del pedido está en las consultas recibidas por parte de bancos sobre las condiciones legales para operar. Y aclaran que los datos solicitados no son sobre los compradores de criptomonedas sino sobre las empresas que las venden.</p>
          <p className="mb-2">El requerimiento del BCRA llegó a través de una nota enviada a las cuatro entidades que agrupan a los bancos, ABA (extranjeros), Adeba (nacionales), Abappra (públicos y privados) y ABE (especializados). También llegó a la Cámara Argentina de Fintech, a la que pertenecen muchas de las principales empresas que operan con criptomonedas en el país.</p>
          <p className="mb-2">La nota que llegó a esas instituciones pide todos los datos "tendientes a permitir la identificación de aquellos clientes de los que se tenga conocimiento que administran, gestionan, controlan y/o procesan movimientos de activos y/o pagos a través de plataformas de gestión electrónica por cuenta y orden de personas humanas y jurídicas residentes en el país o en el exterior, empleando criptoactivos".</p>
          <p className="mb-2">Para no dejar ninguna actividad fuera del control, el BCRA agregó que se debe incluir también "a quienes brindan servicios de resguardo de los criptoactivos" o a quienes "hayan constituido granjas de minado de criptoactivos y/o hayan implementado plataformas de inversión y/o financiamiento basadas en ellos".</p>
          <p className="mb-2">Esto último (cuando menciona a las inversiones) preocupa dentro del heterogéneo mundo fintech, donde no todo son billeteras digitales o crédito online. Hay muchas aplicaciones dedicadas a las inversiones, que permiten entrar y sacar dólares del país a través de las stablecoins, las criptomonedas atadas a una moneda convencional, en particular al dólar, como DAI o USDT. Muchos sospechan que ahí está el verdadero interés del Banco Central.</p>
          <p className="mb-2">El pedido incluye a aquellos que hayan hecho operaciones desde el 1 de abril de 2020 y debe ser presentado ante el BCRA hasta el 30 de abril. De cada operador deberá informarse el nombre o razón social, el CUIT, sus datos de contacto (domicilio, teléfono, email) y también los "tipos de productos y/o servicios que los clientes tienen contratados con la institución informante".</p>
          <p className="mb-2">En Argentina, según diversas fuentes del mercado, ya se abrieron 2 millones de cuentas para operar con Bitcoin y otras criptomonedas. Cabe destacar que eso no implica que haya esa cifra de clientes activos. Abrir una cuenta es gratis y lleva pocos minutos, con lo que es común que un cliente las abra en distintas plataformas para experimentar, ver qué monedas ofrecen y saber cuán amigable es su funcionamiento, en especial para los principiantes en este mercado.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">¿Cuántos sabemos de?</h3>
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="mb-2"><b>1)</b> Un amigo le hace el siguiente comentario: "El gobierno tendría que poner un techo a las tasas de interés que cobran los bancos para que éstas bajen y aumente el crédito". Usted responde:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>a) Es correcto, puesto que así la cantidad de crédito ofrecido va a aumentar</li>
                <li>b) No creo que sea así, puesto que tendrá un exceso de oferta de créditos, con un descenso de créditos ofrecidos.</li>
                <li>c) No será así, ya que lo único que conseguirá es un exceso de demanda de créditos, con un descenso de créditos ofrecidos.</li>
                <li>d) Ninguna de las anteriores</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="mb-2"><b>2)</b> Debido al duro invierno, el gobierno obliga a las empresas a reducir el precio de la garrafa "social" de gas de $ 70 a $ 35. En este caso, se espera</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>a) un exceso de oferta de este bien, que implica que se racionarán garrafas</li>
                <li>b) un exceso de oferta de este bien, que implica que sobrarán garrafas</li>
                <li>c) un exceso de demanda de este bien, que implica que se racionarán garrafas</li>
                <li>d) un exceso de demanda de este bien, que implica que sobrarán garrafas</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="mb-2"><b>3)</b> Debido al aumento de precios, el gobierno decide fijar precio (máximo – mínimo) a los remedios. Si esta medida produce efectos, es probable que se observe un exceso de (oferta – demanda).</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Bibliografía</h3>
          <ul className="list-disc list-inside">
            <li>Mankiw, N. Gregory, Principles of Economics, Sixth Edition, South-Western, Cengage Learning, 2012</li>
            <li>Tetaz, Martín, Economía para Abogados, UNLP, 2006</li>
          </ul>
        </section>

        {/* Botón Volver al final del texto, del lado izquierdo */}
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
} 